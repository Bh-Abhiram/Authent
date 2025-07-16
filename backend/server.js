const express = require('express');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'supersecretkey'; // 🔐 store securely in .env
const crypto = require('crypto');
const { sendMail } = require('./utils/mailer');
const contactRoute = require("./routes/contactRoute");
const verifySetupRoute = require('./routes/verifySetup');



const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/contact", contactRoute);
app.use('/api', verifySetupRoute);


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => console.log('✅ Connected to MongoDB'));

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const secret = speakeasy.generateSecret({ name: `MyApp (${email})` });

    const user = new User({
      name,
      email,
      password: hashedPassword,
      totpSecret: secret.base32,
    });

    await user.save();

    const qrCodeDataURL = await qrcode.toDataURL(secret.otpauth_url);

    res.status(200).json({
      message: 'Signup successful',
      qrCode: qrCodeDataURL,
      email,
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password, token } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Email not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('🔐 Password match:', passwordMatch);

    if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' });

    console.log('🔑 OTP Provided:', token);
    console.log('📦 TOTP Secret from DB:', user.totpSecret);

    const otpValid = speakeasy.totp.verify({
      secret: user.totpSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    console.log('✅ OTP Valid:', otpValid);

    if (!otpValid) return res.status(401).json({ message: 'Invalid OTP' });

    const accessToken = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token: accessToken });
  } catch (err) {
    console.error('⚠️ Login Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email not found' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    const link = `${process.env.BASE_URL}/reset-password?token=${token}&email=${email}`;

    await sendMail({
      to: email,
      subject: 'Reset Password',
      html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`
    });

    res.json({ message: 'Reset link sent to your email' });
  } catch (err) {
    console.error('⚠️ Forgot Password Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/reset-password', async (req, res) => {
  const { token, email, newPassword } = req.body;
  const user = await User.findOne({ email, resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();

  res.json({ message: 'Password reset successful' });
});

// Add this route in server.js
app.get('/api/validate-reset-token', async (req, res) => {
  console.log('🔍 Validate token route hit:', req.query);

  const { token, email } = req.query;

  const user = await User.findOne({
    email,
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ valid: false });

  res.json({ valid: true });
});



app.get('/api/dashboard', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      name: user.name
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});
