@echo off
echo.
echo ====================================
echo   CastUp - Push to GitHub
echo ====================================
echo.
echo Your code is ready to push!
echo.
echo When prompted:
echo   Username: your-github-username
echo   Password: paste-your-token-here (starts with ghp_)
echo.
echo Press any key to continue...
pause >nul

cd /d "%~dp0"
git push -u origin main

echo.
echo ====================================
if %ERRORLEVEL% EQU 0 (
    echo   SUCCESS! Code pushed to GitHub!
    echo   View at: https://github.com/castup-ai/castup
) else (
    echo   Authentication needed!
    echo   Get token: https://github.com/settings/tokens/new
)
echo ====================================
echo.
pause
