@echo off
set path_build_back=..\backend\public\
set path_build_front=.\dist\

echo *** Cleaning dist folder ***
rmdir /s /q %path_build_front%
echo *** Building frontend elements ***
call npm run build --c=production
echo *** Cleaning public folder ***
rmdir /s /q %path_build_back%
echo *** Pasting built elements ***
xcopy /s /i %path_build_front%* %path_build_back%