// Section 1
const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')

const publicPath = path.join(__dirname, '..', 'public');
const attendenceSavedPath = path.join(publicPath, 'attendence');
// Section 2
const app = express();
app.use(express.static(publicPath));
app.use(bodyParser.json());
// Section 3
app.get('/', (req, res) => {
    res.send("<h1>Home page</h1>");
});

app.get('/users', (req, res) => {
    axios.get('https://randomuser.me/api/?page=1&results=10')
        .then(response => {
            res.send(response.data);
         });
});
/*
{
attendence:{
    1:10.30,
    2:12:30
}
}*/

/*
type:in
attendence:{
    1:10.30,
    2:11.20
}
out:{

}*/
//save files to path
app.post('/saveattendence', async (req, res) => {
    if(!fs.existsSync(attendenceSavedPath)){
        fs.mkdirSync(attendenceSavedPath);
    }
    const fullDate = new Date();
    const date = fullDate.getDate();
    const year = fullDate.getFullYear();
    const month = fullDate.getMonth()+1;
    const body = req.body;
    const monthPath = path.join(attendenceSavedPath, `${month}`);
    if(!fs.existsSync(monthPath)){
        fs.mkdirSync(monthPath);
    }
    const todayFile = path.join(monthPath, `${date}_${year}_${month}_${body.type}.json`);

    if(fs.existsSync(todayFile)){//file exists
        try{
            fs.readFile(todayFile,'utf8', async (err, oldResponse) => {
                const oldData = await JSON.parse(oldResponse);
                console.log(body.attendence);
                const newAttendence =  body.attendence;
                const newData = {...oldData, ...newAttendence};
                const data = await JSON.stringify(newData);
                fs.writeFile(todayFile,data, (err) => {
                    if(err){
                        console.log(err);
                    }
                    res.status("ok");
                }); 
            });
        }catch(error){
            console.log(error);
            res.status(error);
        }
    }else{//file not exists
        const data = await JSON.stringify(body.attendence);
        console.log(data);
        fs.writeFile(todayFile,data, (err) => {
            if(err){
                console.log(err);
            }
            res.status("ok");
        });        
    }
    
})

//retrive files from path

// Section 4
app.listen(3000, () => {
    console.log('server started on port 3000');
});