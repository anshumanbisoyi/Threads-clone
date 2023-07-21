import { Box } from "@mui/material";

const UserImage = ({ image, size="60px"}) => {
    return (
        <Box width={size} height={size}>
            <img src={`http://localhost:3001/assets/${image}`} alt="User" style={{width: size, height: size, borderRadius: "50%"}} />
        </Box>
    )
} 

export default UserImage;