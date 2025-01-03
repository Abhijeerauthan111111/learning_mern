const Favourite = require('../models/favourite');
const Home = require('./../models/home')

exports.gethomes = (req,res,next)=>{
    Home.find().then((registeredhomes) =>{
    
        res.render('store/homes',{homes:registeredhomes, pagetitle:'Hamara Airbnb'})
    });
   
    
} 

exports.getindex = (req,res,next)=>{
    Home.find().then((registeredhomes) =>{
    
        res.render('store/index',{homes:registeredhomes, pagetitle:'Hamara Airbnb'})
    });
}

exports.gethomedetails = (req,res,next)=>{
   
    const homeid = req.params.homeid;
    Home.findById(homeid).then((home) => {
       
        if(!home){
         console.log("Home not found");
         return res.redirect("/homes");
        }
        res.render('store/homedetails',{home:home ,pagetitle:'Home Details'})
        
    })
    
}

exports.postfavourite =(req,res,next)=>{
const homeid = req.body.id;
Favourite.findOne({homeid}).then(existingfav=>{
    if(existingfav){
      return  res.redirect('/favourites') 
    }
    const fav = new Favourite({homeid:homeid})
    return fav.save();
}).then( ()=>res.redirect('/favourites') ).catch((err)=>{
    console.log("Erro while adding to fav ",err);
     res.redirect('/favourites')    
})
}
    



// exports.getfavourite = (req,res,next)=>{
//     Favourite.find().then(favouriteids=>{
        
//         Home.find().then((registeredhomes) =>{
//         favouriteids = favouriteids.map(favid=>favid.homeid.toString());

//         console.log(favouriteids,registeredhomes)
//         const favouritehome = registeredhomes.filter(home=>favouriteids.includes(home._id.toString()))
//         res.render('store/favourites',{homes:favouritehome, pagetitle:'favourites'})
//         });
//     })

     
// }

exports.getfavourite = (req,res,next)=>{
    Favourite.find().populate("homeid").then(favouriteidhomes=>{
        
        const favouritehome  = favouriteidhomes.map(favouriteidhomes=>favouriteidhomes.homeid);
        res.render('store/favourites',{homes:favouritehome, pagetitle:'favourites'})
        
    }).catch(err=>{console.log("Error while getting home ",err)
        res.redirect("store/favourites")
    })

     
}



exports.postdeletefavourite = (req,res,next)=>{
    const homeid = req.params.homeid;
    Favourite.findOneAndDelete({homeid}).then(()=>{
        console.log("Home deleted from favoutite " , homeid);
        res.redirect("/favourites")
    }
       
    ).catch(err=>{
        if(err){
          console.log("Error occured while deleting from favourite " , err)
          res.redirect("/favourites")
        }
        
    })

}

