const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const JWT = require('jsonwebtoken');

const Influencer = require('../models/Influencer');
const Brand = require('../models/Brand');
const InfluencerToken = require('../models/InfluencerToken');
const BrandToken = require('../models/BrandToken');


const fetchUser = require('../middlewares/fetchUser');
const sendEmail = require("../utils/email");

const JWT_SECRET = '!@#$%'

const serverHost = process.env.SERVER_HOST
const clientHost = process.env.CLIENT_HOST

// Route 1: /api/auth/create-influencer  //No login required
router.post('/create-influencer',
    // Giving details to Validate req
    [body('name', 'Name must be atleast of 3 characters').isLength({ min: 3 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be atleast of 5 characters').isLength({ min: 5 })],
    
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        // If errors return bad request and error message
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Check whether user exist or not
            let user = await Influencer.findOne({email: req.body.email})
            if(user){
                if(user.verified){
                    return res.status(400).json({success, error: `Email id already exist with ${req.body.email}`})
                }
                console.log(user._id)
                await Influencer.findByIdAndDelete(user._id)
            }
            const pass = req.body.password;

            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)
    
            user = await Influencer.create({
                name : req.body.name,
                email : req.body.email,
                password : secPass,
                pass: pass,
                contactNumber: req.body.contactNumber,
                ytlink: req.body.ytlink,
                iglink : req.body.iglink,
                category: req.body.category,
                message: req.body.message,
                ytsubs: 0,
                igfollowers:0

            })
            
            const data = {
                user : {
                    id : user.id
                }
            }
            

            const authToken = JWT.sign(data, JWT_SECRET)

            console.log(authToken)
            let token = await new InfluencerToken({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
            console.log(token);
            console.log(user.id);
            console.log(token.token);

        
            const message = `${serverHost}/api/auth/influencer/verify/${user.id}/${token.token}`;
            console.log(message);
            await sendEmail(user.email, "Verify Email", message);
            // res.setHeader(name, value)
            // res.send("An Email sent to your account please verify");

            // res.json(user)
            success = true;
            res.json({success, authToken})
            
        }  catch(err) {
            res.status(500).json({error: "Something went wrong"})
        }

})

// Route 2: /api/auth/create-brand  //No login required
router.post('/create-brand',
    // Giving details to Validate req
    [body('name', 'Name must be atleast of 3 characters').isLength({ min: 3 }),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be atleast of 5 characters').isLength({ min: 5 })],
    
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        // If errors return bad request and error message
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Check whether user exist or not
            let user = await Brand.findOne({email: req.body.email})
            if(user){
                return res.status(400).json({success, error: `Email id already exist with ${req.body.email}`})
            }
            const pass = req.body.password;

            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)
    
            user = await Brand.create({
                name : req.body.name,
                email : req.body.email,
                password : secPass,
                pass: pass,
                contactNumber: req.body.contactNumber,
                website: req.body.website,
                category: req.body.category,
                message: req.body.message,
                activeCamp:0,
                totalCamp:0
            })
            
            const data = {
                user : {
                    id : user.id
                }
            }
            

            const authToken = JWT.sign(data, JWT_SECRET)

            console.log(authToken)
            let token = await new BrandToken({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
            console.log(token);
            console.log(user.id);
            console.log(token.token);

        
            const message = `Verify your influensup account by using link - ${serverHost}/api/auth/brand/verify/${user.id}/${token.token}  Link expires after 5 minutes`;
            console.log(message);
            await sendEmail(user.email, "Verify Email", message);
            // res.setHeader(name, value)
            // res.send("An Email sent to your account please verify");
            // res.json(user)
            success = true;
            res.json({success, authToken})
            
        }  catch(err) {
            res.status(500).json({error: "Something went wrong"})
        }

})


router.get("/influencer/verify/:id/:token", async (req, res) => {
    try {
      const user = await Influencer.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send("Invalid link");
  
      const token = await InfluencerToken.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.status(400).send("Invalid link");
  
      await Influencer.updateOne({ _id: user._id}, {verified: true });
      await InfluencerToken.findByIdAndRemove(token._id);

      const message = 'Your Email for influensup is verified successfully. You can now login to your dashboard.'
      await sendEmail(user.email, "Email Verified Successfully", message);
      res.redirect(`${clientHost}/verified`)
    //   res.send("email verified sucessfully");
    } catch (error) {
      res.status(400).send("An error occured");
    }
  });


router.get("/brand/verify/:id/:token", async (req, res) => {
    try {
      const user = await Brand.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send("Invalid link");
      const token = await BrandToken.findOne({
          userId: user._id,
          token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link");
        
        await Brand.updateOne({ _id: user._id}, {verified: true }).catch(e=> {console.log(e); return res.send("not found")});
        // await Brand.findByIdAndUpdate(user._id,{ verified: true }).catch(e=> {console.log(e); return res.send("not found")});
        console.log("first")
        await BrandToken.findByIdAndRemove(token._id);

        const message = 'Your Email for influensup is verified successfully. You can now login to your dashboard.'
        await sendEmail(user.email, "Email Verified Successfully", message);
        
    
        res.redirect(`${clientHost}/verified`);
    } catch (error) {
      res.status(400).send("An error occured");
    }
  });

// Route 2: /api/auth/login  // No login required
router.post('/login',
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password cannot be empty').exists(),

    async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    // If errors return bad request and error message
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const {email, password} = req.body;

        let user = await Influencer.findOne({email})
        if(!user){
            return res.status(400).json({success, error : 'Invalid Credentials'})
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password)
        
        if(!passwordCompare){
            return res.status(400).json({success, error: "Invalid Credentials"})
        }

        const data = {
            user : {
                id : user.id
            }
        }

        const authToken = JWT.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authToken})
   
    } catch (error) {
        res.status(500).json({message: "Internal Server Error ", error})
    }
})


// Route 2: /api/auth/brand-login  // No login required
router.post('/brand-login',
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password cannot be empty').exists(),

    async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    // If errors return bad request and error message
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const {email, password} = req.body;

        let user = await Brand.findOne({email})
        if(!user){
            return res.status(400).json({success, error : 'Invalid Credentials'})
        }
        if(!user.verified){
            return res.status(400).json({success, error : 'Register again! to verify your email'})
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password)
        
        if(!passwordCompare){
            return res.status(400).json({success, error: "Invalid Credentials"})
        }

        const data = {
            user : {
                id : user.id
            }
        }

        const authToken = JWT.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authToken})
   
    } catch (error) {
        res.status(500).json({message: "Internal Server Error ", error})
    }
})

// Route 3 : api/auth/get-user // Login required

router.post('/get-influencer', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Influencer.findById(userId).select("-password -pass")
    
        res.json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")    
    }
})


// Route 3 : api/auth/get-user // Login required

router.post('/get-brand', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await Brand.findById(userId).select("-password -pass")

        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")    
    }
})


// Influencer -Upadate
router.put('/update-influencer/:id', fetchUser, async (req, res)=>{
        let olduser = req.body;
        let newUser  = {}
    
        try {
            if(olduser){newUser= olduser};
            
            // Find user to be updated and update it
    
            // user not exist
            let myuser = await Influencer.findById(req.params.id)
            if(!myuser){
                return res.status(404).json({error: "Not Found"})
            }
          
            if(myuser._id.toString() !== req.user.id){
                return res.status(401).json({error:"Unauthorized user"})
            }
    
            myuser = await Influencer.findByIdAndUpdate(req.params.id, {$set: newUser}, {new:true})
            res.json(myuser);
            
        } catch (error) {
            console.log(error.message)
            res.status(500).json({error: "Internal server error"})
        }
    
    })
    
// Brand-update
router.put('/update-brand/:id', fetchUser, async (req, res)=>{
    let olduser = req.body;
    let newUser  = {}

    try {    
        if(olduser){newUser= olduser};

        // Find user to be updated and update it
        // user not exist
        let myuser = await Brand.findById(req.params.id)
        if(!myuser){
            return res.status(404).json({error: "Not Found"})
        }
      
        if(myuser._id.toString() !== req.user.id){
            return res.status(401).json({error:"Unauthorized user"})
        }

        myuser = await Brand.findByIdAndUpdate(req.params.id, {$set: newUser}, {new:true})
        res.json(myuser);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: "Internal server error"})
    }

})

module.exports = router