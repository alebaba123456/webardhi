async function errorHandler(error, req, res, next) {
    switch (error.name) {
        case 'SequelizeUniqueConstraintError' :
            res.status(400).json({message: error.errors.map(el => el.message)})
            break
        case 'SequelizeValidationError' :
            res.status(400).json({message: error.errors.map(el => el.message)})
            break
        case 'Data not found.' :
            res.status(404).json({message: "DATA TIDAK DITEMUKAN"})
            break
        case 'Empty input field.' :
            res.status(400).json({message: "INPUT TIDAK BOLEH KOSONG"})
            break
        case 'Invalid input.' :
            res.status(400).json({message: "INPUT SALAH TIDAK DIIZINKAN"})
            break
        case 'Duplicated.' :
            res.status(400).json({message: "DATA TIDAK DAPAT DI DUPLIKASI"})
            break
        case 'Email already used.' :
            res.status(400).json({message: "EMAIL SUDAH DIGUNAKAN"})
            break
        case 'Password did not match.' :
            res.status(400).json({message: "KATA SANDI TIDAK SAMA"})
            break
        case 'Invalid grade value.' :
            res.status(400).json({message: "TINGKAT KELAS SALAH"})
            break
        case 'Invalid code format.' :
            res.status(400).json({message: "KODE KELAS SALAH"})
            break
        case 'Modified payload.' :
            res.status(400).json({message: "MODIFIKASI PAYLOAD"})
            break
        case 'User not registered.' :
            res.status(401).json({message: "EMAIL ATAU KATA SANDI SALAH"})
            break
        case 'Authentication error.' :
            res.status(401).json({message: "EMAIL ATAU KATA SANDI SALAH"})
            break
        case 'Forbidden.':
            res.status(403).json({message: "TIDAK MEMILIKI IZIN UNTUK MELAKUKAN INI"})
            break
        case 'OnExamination.':
            res.status(403).json({message: "PENGGUNA SEDANG DALAM UJIAN"})
            break
        case 'ExaminationTaken.':
            res.status(403).json({message: "PENGGUNA TELAH MENGERJAKAN UJIAN INI"})
            break
        case 'JsonWebTokenError':
        case 'Unauthenticated.':
            res.status(401).json({message: "AUTHENTIKASI GAGAL"})
            break
        default:
            res.status(500).json({message: "INTERNAL SERVER ERROR"})
            break
    }
}

module.exports = errorHandler