import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        // width={size}
        // width={'20px'}
        // height={size}
        className="h-[55px] w-[50px]"
        alt="user"
        src={`http://localhost:7000/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;