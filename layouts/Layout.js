import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import  Typography  from "@mui/material/Typography";
import Image from "next/image";
import Comments from "@/adminpage/Comments";
import NavBar from "@/adminpage/NavBar";
import Peoples from "@/adminpage/Peoples";

function Layout({ children ,handleSearch,item}) {
  return (
    <>
      <Container maxWidth="xl" >
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Peoples handleSearch={handleSearch} />
          <Box
            flex={2}
            sx={{
              color: "black",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <NavBar />
            <Stack
              direction="row"
              spacing={2}
              sx={{ width: "100%", height: 70 ,marginTop:9}}
            >
              <Box
                sx={{
                  width: "10%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Image
                  src={require("../assets/avatar.jpg")}
                  alt="group"
                  style={{
                    height: "70%",
                    width: "90%",
                    borderRadius: "50%",
                  }}
                />

                <Typography
                  sx={{ color: "black", fontSize: 10, fontWeight: "bold" }}
                >
                  Name
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "10%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Image
                  src={require("../assets/avatar.jpg")}
                  alt="group"
                  style={{
                    height: "70%",
                    width: "90%",
                    borderRadius: "50%",
                  }}
                />

                <Typography
                  sx={{ color: "black", fontSize: 10, fontWeight: "bold" }}
                >
                  Name 2
                </Typography>
              </Box>
            </Stack>
            {children}
          </Box>
          <Comments item={item}/>
        </Stack>
      </Container>
    </>
  );
}

export default Layout;
