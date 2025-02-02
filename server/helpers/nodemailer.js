const nodemailer = require('nodemailer');

async function sendUserVerification(email, username, password) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Al-Husna - Pendaftaran User Baru',
        text: `Kepada ${username},\n\nAkun anda telah berhasil dibuat.\n\nEmail: ${email}\nPassword: ${password}\n\nPesan ini bersifat rahasia, silahkan segera ganti password anda.\n\nBest regards,\nAl-Husna Team`,
    };

    await transporter.sendMail(mailOptions);
}

async function sendRequestResetPassword(email, encryptedToken) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const resetLink = `${process.env.BASE_URL}/user/confirm/${encodeURIComponent(encryptedToken)}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Al Husna - Request Lupa Password',
        html: `<p>Silakan klik link berikut untuk mereset password Anda:</p>
                           <a href="${resetLink}">${resetLink}</a>
                           <p>Link ini hanya berlaku selama 30 menit.</p>`,
    };

    await transporter.sendMail(mailOptions);
}

async function sendConfirmResetPassword(email, newPassword) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Al Husna - Password Reset',
        html: `<p>Password Anda telah direset. Berikut adalah password baru Anda:</p>
                       <p><strong>${newPassword}</strong></p>
                       <p>Segera ganti password ini setelah login untuk keamanan.</p>`,
    };

    await transporter.sendMail(mailOptions);
}

async function sendSessionVerification(email, encryptedToken) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const resetLink = `${process.env.BASE_URL}/session/confirm/${encodeURIComponent(encryptedToken)}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Al Husna - Verifikasi Login',
        html: `<p>Seseorang mencoba masuk ke akun anda. Jika ini adalah Anda klik tautan dibawah ini:</p>
                       <a href="${resetLink}">${resetLink}</a>
                       <p>Link ini hanya berlaku selama 30 menit.</p>
                       <p>Jika ini bukan anda, lakukan penggantian kata sandi segera!</p>`,
    };

    await transporter.sendMail(mailOptions);
}
module.exports = {
    sendSessionVerification,
    sendRequestResetPassword,
    sendConfirmResetPassword,
    sendUserVerification
};