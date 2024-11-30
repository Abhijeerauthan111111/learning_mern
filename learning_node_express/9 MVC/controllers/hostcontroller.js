const Home = require('./../models/home')

exports.getaddhome = (req,res,next)=>{
    
    res.render("host/add-home",{pagetitle:'Add Your Home'})
}

exports.postaddhome = (req,res,next)=>{
    console.log("Host controller",req.body);
    const {housename,price,rating,location,photourl,features,description} = req.body;
    
    const newhome = new Home(housename,price,rating,location,photourl,features,description);
    console.log("error check")
    
    newhome.save(err=>{
        if(err){
            console.log("error occured while saving house",err);
            res.redirect('/')
        }
        else{
            console.log("Home added")
            res.render("host/home-added",{pagetitle:"Home Added"})  
        }
    });
    
    };




exports.gethosthome = (req,res,next)=>{
        Home.fetchall(registeredhomes =>{
        
            res.render('host/hosthome',{homes:registeredhomes, pagetitle:'Host Home'})
        });
       
        
    } 

exports.getedithome = (req,res,next)=>{
        const homeid = req.params.homeid;
        const editing = req.query.editing ==="true";
        if(!editing){
            console.log("EDiting flag not set properly")
            return res.redirect("/hosthome")
        }

        Home.findbyid(homeid,home =>{
            if(!home){
                console.log("Home not found for editing");
                return res.redirect("/hosthome");
            }
            console.log(homeid,editing,home)
            res.render('host/edit-home',{pagetitle:'Edit Your Home'})
        })
       
    }    