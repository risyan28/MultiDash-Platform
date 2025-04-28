@echo off
setlocal

REM === Config ===
set ZIP_NAME=nextjs-pwa-export.zip
set PROJECT_NAME=nextjs-pwa
set TEMP_FOLDER=%TEMP%\%PROJECT_NAME%

echo.
echo 🚀 Membuat ZIP project: %ZIP_NAME%
echo 📦 Mengecualikan folder berat: node_modules, .next, dll
echo.

REM Hapus file lama
if exist %ZIP_NAME% (
    del %ZIP_NAME%
)

REM Hapus folder temp jika sudah ada
if exist "%TEMP_FOLDER%" (
    rmdir /s /q "%TEMP_FOLDER%"
)

REM Buat folder sementara di luar folder project
mkdir "%TEMP_FOLDER%"

echo 🔄 Menyalin file ke folder sementara...

REM Copy isi folder project kecuali yang di-exclude
xcopy * "%TEMP_FOLDER%\" /E /I /Y /EXCLUDE:zip-exclude.txt >nul

REM Jalankan zip
powershell Compress-Archive -Path "%TEMP_FOLDER%\*" -DestinationPath "%ZIP_NAME%" -CompressionLevel Optimal

REM Hapus folder temp
rmdir /s /q "%TEMP_FOLDER%"

if exist %ZIP_NAME% (
    echo ✅ ZIP berhasil dibuat: %ZIP_NAME%
) else (
    echo ❌ Gagal membuat ZIP
)

echo.
pause
endlocal
