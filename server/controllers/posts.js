import Post from "../models/Post.js";
import User from "../models/User.js";


//create

export const createPost = async (req, res) => {
    try{
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes:{},
            comments: [], 
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    }catch(err){
        res.status(409).json({message:err.message});
    }
}

//read
export const getFeedPosts = async (req,res) =>{
    try{
        const post = await Post.find();
        res.status(200).json(post);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

// export const getFeedPosts = async (req, res) => {
//   try {
//     const page = req.query.page ? parseInt(req.query.page) : 1;
//     const limit = 5; // Number of posts to fetch per page

//     // Calculate the starting index of the posts to fetch based on the page number
//     const startIndex = (page - 1) * limit;

//     // Fetch posts from the database with pagination
//     const posts = await Post.find()
//       .sort({ createdAt: -1 }) // Sort posts in descending order based on creation date
//       .skip(startIndex)
//       .limit(limit);

//     // Check if there are more posts to load on the next page
//     const totalPosts = await Post.countDocuments();
//     const hasMore = startIndex + limit < totalPosts;

//     res.status(200).json({ posts, hasMore });
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };


export const getUserPosts = async (req,res)=>{
        try {
          const { userId } = req.params;
          const post = await Post.find({ userId });
          res.status(200).json(post);
        } catch (err) {
          res.status(404).json({ message: err.message });
        }
};

// export const getUserPosts = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const page = req.query.page ? parseInt(req.query.page) : 1;
//     const limit = 5; // Number of posts to fetch per page

//     // Calculate the starting index of the posts to fetch based on the page number
//     const startIndex = (page - 1) * limit;

//     // Fetch user-specific posts from the database with pagination
//     const posts = await Post.find({ userId })
//       .sort({ createdAt: -1 }) // Sort posts in descending order based on creation date
//       .skip(startIndex)
//       .limit(limit);

//     // Check if there are more posts to load on the next page
//     const totalPosts = await Post.countDocuments({ userId });
//     const hasMore = startIndex + limit < totalPosts;

//     res.status(200).json({ posts, hasMore });
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };



//update
export const likePost = async (req,res)=>{
     try {
       const { id } = req.params;
       const { userId }= req.body;
       const post = await Post.findById(id); 
       const isLiked = post.likes.get(userId);

       if(isLiked){
        post.likes.delete(userId);
       } else{
        post.likes.set(userId, true);
       }

       const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
       );

       res.status(200).json(updatedPost);
     } catch (err) {
       res.status(404).json({ message: err.message });
     }
}

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Post.findByIdAndDelete(id);

    // You can also do additional actions here, like removing post references from user's profile, etc.

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, picturePath } = req.body;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        description: description || post.description,
        picturePath: picturePath || post.picturePath,
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
