npm run build:prod
cd ..\dist\ChabFitnessTracker
ftp -i -s:..\..\scripts\ftpcmd.txt ftp.bacms.ca
