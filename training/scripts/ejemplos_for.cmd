
********************
*   COMANDO FOR    *
********************


syntax-FOR-Files
       FOR %%parameter IN (set) DO command 
   
syntax-FOR-Files-Rooted at Path   
       FOR /R [[drive:]path] %%parameter IN (set) DO command 
   
syntax-FOR-Folders
       FOR /D %%parameter IN (folder_set) DO command 
   
syntax-FOR-List of numbers   
       FOR /L %%parameter IN (start,step,end) DO command 
   
syntax-FOR-File contents   
       FOR /F ["options"] %%parameter IN (filenameset) DO command 
   
       FOR /F ["options"] %%parameter IN ("Text string to process") DO command
   
syntax-FOR-Command Results 
       FOR /F ["options"] %%parameter IN ('command to process') DO command
       
