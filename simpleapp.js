const fs=require("fs/promises");
(async()=>{
    const craeteFile=async(path)=>{
        try{
            const existingFileHandle=await fs.open(path,"r");
            existingFileHandle.close();
            return console.log(`The file ${path} already exists.`);
        }catch(e){
            const newFileHandle=await fs.open(path,"w");
            console.log("A New file was sucessfully created.")
            newFileHandle.close();
        }
    };
    const deleteFile = async (path) => {

        try {
        
        await fs.unlink(path);
        console.log("The file was deleted sucessfully")
    }
        
        catch (e) {
        
        if (e.code = "ENDENT") {
        
        console.log("No file at this path to remove.");
        
        } else {
        
        console.log("An error occurred while removing the file: "); 
        console.log(e);
        
        }
    }
        
        };
    
        const renameFile = async (oldPath, newPath) => {

            try {
            
            await fs.rename(oldPath, newPath);
            
            console.log("The file was successfully renamed.");
            
            } catch (e) {
            
            if (e.code === "ENOENT") {
            
            console.log("No file at this path to rename, or the destination doesn't exist.")
            
            } else {
            
            console.log("An error occurred while removing the file: ");
            
            console.log(e);
            
            }
        }
            
            };
            let addedContent;


            const addToFile = async (path, content)=>{

                if (addedContent === content) return;
                
                try {
                
                const fileHandle = await fs.open(path, "a");
                
                fileHandle.write(content);
                
                addedContent = content;
                
                console.log("The content was added successfully.");
                
                } catch (e) {
                
                console.log("An error occurred while removing the file: ");
                
                console.log(e);
                }
                
                };












    const CREATE_FILE="create a file"
    const DELETE_FILE="delete the file"
    const RENAME_FILE="rename the file"
    const ADD_TO_FILE="add to the file"

    const commandFileHandler=await fs.open("./command.txt","r")
    commandFileHandler.on("change",async()=>{
        const size = (await commandFileHandler.stat()).size;
    const buff=Buffer.alloc(size);
    const offset=0;
    const length=buff.byteLength;
    const position=0;
    await commandFileHandler.read(
        buff,
        offset,
        length,
        position
    );
    const command=buff.toString("utf-8");
    if(command.includes(CREATE_FILE)){
        const filePath=command.substring(CREATE_FILE.length+1);
        craeteFile(filePath)
    }

    if(command.includes(DELETE_FILE)){
        const filePath=command.substring(DELETE_FILE.length+1);
        deleteFile(filePath)
    }
    if (command.includes (RENAME_FILE)) {

        const _idx = command.indexOf(" to ");
        
        const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx)
        
        const newFilePath = command.substring(_idx + 4)
        
        renameFile(oldFilePath, newFilePath)
        
        }
        
        // add to file:
        
        // add to the file <path> this content: <content>
        
        if (command.includes (ADD_TO_FILE)) {
        
        const _idx = command.indexOf(" this content: ")
        
        const filePath = command.substring(ADD_TO_FILE.length + 1, _idx)
        
        const content =command.substring(_idx+15)
        
        addToFile(filePath, content)
        
        }


    
    });

    const watcher=fs.watch("./command.txt");
    for await(const event of watcher){
        if(event.eventType==="change"){
            commandFileHandler.emit("change")
        //console.log("The file was changed")

    }
}

})();