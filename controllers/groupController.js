const { Group, AppUser, GroupMember } = require("../models");
const { v4: uuidv4 } = require("uuid");

exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;
    const group = await Group.create({
      name,
      code: uuidv4().slice(0, 6),
      createdBy: userId,
    });
    await GroupMember.create({ userId, groupId: group.id });
    res.status(200).json({ message: "Group Created", group });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Group Creation failed", error: err.message });
  }
};

exports.joinGroup = async (req, res) => {
    try{
    const { code } = req.body;
    const userId = req.user.id;
    const group = await Group.findOne({ where: { code } });
    if(!group) return res.status(400).json({message : "Group not found"})
    
    const alreadyMember = await GroupMember.findOne({ where: { userId,groupId: group.id} });
    if(alreadyMember) return res.status(400).json({message : "Already a member of this group"}) 
    await GroupMember.create({ userId, groupId: group.id });
    res.status(200).json({message : "Group Joined Successfully"})
    }
    catch(err){
        res.status(500).json({message :"Join failed" , error : err.message})
    }
    }
exports.leaveGroup = async (req, res) => {
try{
    const { code } = req.body;
    const userId = req.user.id;
    const group = await Group.findOne({ where: { code } });
    if(!group) return res.status(400).json({message : "Group not found"})
    const leaveGroup = await GroupMember.destroy({where :{groupId: group.id, userId}})
    if(!leaveGroup) return res.status(400).json({message :"Not part of the group"})
    res.status(200).json({message:"Left the group"})
}
catch(err){
res.status(500).json({message: "leave failed", error : err.message})
}
};

exports.listUserGroups = async (req, res) => {
  try {
    const user = await AppUser.findByPk(req.user.id, {
      include: [{ model: Group, as: 'groups' }]
    });

    res.status(200).json({ groups: user.groups });
  } catch (err) {
    res.status(500).json({ message: 'Failed to list groups', error: err.message });
  }
};

