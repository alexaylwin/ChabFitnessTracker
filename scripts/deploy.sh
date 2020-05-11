::Build the project
::call npm run build:prod

::Create the FTP commands
echo alexaylwin@bacms.ca>> .ftpcmds
echo %FTP_PWD%>> .ftpcmds
echo cd chab-fitness>> .ftpcmds
echo mdel *>> .ftpcmds
echo lcd ..\dist\ChabFitnessTracker>> .ftpcmds
echo mput *>> .ftpcmds
echo quit>> .ftpcmds

::Execute FTP commands
::ftp -i -s:.ftpcmds ftp.bacms.ca

::cd ..\dist\ChabFitnessTracker