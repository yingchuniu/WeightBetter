import React from "react";
import { Container, Grid, Card, CardHeader, CardContent, Box, Typography, Button, CardActions } from "@mui/material";
import StarIcon from "@mui/icons-material/StarBorder";
const tiers = [
    {
        title: "免費",
        price: "0",
        description: ["一份菜單", "查看一般文章", "查看健身影片"],
        buttonText: "目前方案",
        buttonVariant: "outlined",
    },
    {
        title: "進階",
        subheader: "最受歡迎",
        price: "99",
        description: ["查看專家文章", "隨時客製化菜單", "開通留言功能", "購買商品賞品享9折"],
        buttonText: "Get started",
        buttonVariant: "contained",
    },
    {
        title: "Enterprise",
        price: "30",
        description: ["50 users included", "30 GB of storage", "Help center access", "Phone & email support"],
        buttonText: "Contact us",
        buttonVariant: "outlined",
    },
];
const Billing = () => {
    return (
        <div>
            {" "}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={tier.title} xs={12} sm={tier.title === "Enterprise" ? 12 : 6} md={4}>
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: "center" }}
                                    action={tier.title === "Pro" ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                        align: "center",
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "baseline",
                                            mb: 2,
                                        }}>
                                        <Typography component="h2" variant="h3" color="text.primary">
                                            ${tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            /mo
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography component="li" variant="subtitle1" align="center" key={line}>
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant}>
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Billing;
