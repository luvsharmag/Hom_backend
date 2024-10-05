import {NavLink} from "../models/navlinks.js";

export const newNavlink = async(req,res)=>{
    try {
        const navLinks = req.body; 
        const savedLinks = await NavLink.insertMany(navLinks); 
        res.status(201).json(savedLinks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getNavLinks = async(req,res)=>{
    try {
        const navLinks = await NavLink.find();
        res.status(200).json(navLinks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateNavLink = async (req, res) => {
    const { linkId } = req.params;
    try {
        const navLink = await NavLink.findByIdAndUpdate(linkId, req.body, { new: true });
        if (!navLink) return res.status(404).json({ message: 'NavLink not found' });
        res.status(200).json(navLink);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const deleteNavLink = async (req, res) => {
    const { linkId } = req.params;
    try {
        const navLink = await NavLink.findByIdAndDelete(linkId);
        if (!navLink) return res.status(404).json({ message: 'NavLink not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};