/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Link from "@material-ui/core/Link";
import { Chip, Avatar, Hidden } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton, Tooltip, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import { getTranslations as t } from "../../locales";
let QRCode = require("qrcode.react");

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "auto",
  },

  footer: {
    textAlign: "center",
    color: theme.palette.diamondBlack.main,
    padding: theme.spacing(3, 2),
  },

  topScrollPaper: {
    alignItems: "start",
    marginTop: "10vh",
  },
  topPaperScrollBody: {
    verticalAlign: "middle",
  },

  chip: {
    marginTop: 5,
    border: "none",
    borderRadius: 8,
    textTransform: "none",
    boxShadow: "none",
    color: theme.palette.diamondBlack.main,
    backgroundColor: theme.palette.alto.light,
    "&:hover": {
      backgroundColor: theme.palette.alto.main,
    },
    "&:focus": {
      backgroundColor: theme.palette.alto.main,
      boxShadow: "none",
    },
    transition: "background-color 0.2s ease-out",
    transition: "color .01s",
  },

  monIcon: {
    color: theme.palette.mountainMist.main,
  },

  qr: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
    marginBottom: 20,
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`donation-tabpanel-${index}`}
      aria-labelledby={`donation-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};

export default function Footer() {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [currAvatar, setCurrAvatar] = useState("xmr");
  const [donateDialog, setDonateDialog] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const cryptoAddrs = [
    {
      type: "monero",
      alt: "xmr",
      addr: "84zQq4Xt7sq8cmGryuvWsXFMDvBvHjWjnMQXZWQQRXjB1TgoZWS9zBdNcYL7CRbQBqcDdxr4RtcvCgApmQcU6SemVXd7RuG",
    },
    {
      type: "bitcoin",
      alt: "btc",
      addr: "bc1qlfnq8nu2k84h3jth7a27khaq0p2l2gvtyl2dv6",
    },
    {
      type: "ethereum",
      alt: "eth",
      addr: "0xF6F204B044CC73Fa90d7A7e4C5EC2947b83b917e",
    },
  ];

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
    handleSnackOpen();
  };

  const handleSnackOpen = () => {
    setTimeout(function () {
      setSnackOpen(true);
    }, 60000);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClickOpen = () => {
    setDonateDialog(true);
  };

  const handleClose = () => {
    setDonateDialog(false);
  };

  useEffect(() => {
    handleSnackOpen();

    setInterval(() => {
      setCurrAvatar(
        cryptoAddrs[Math.floor(Math.random() * cryptoAddrs.length)].alt
      );
    }, 10000);
  }, []);

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            Built and developed by{" "}
            <Link
              href=""
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              {"satish"}
            </Link>
          </Typography>
         <Dialog
            scroll="body"
            maxWidth="sm"
            fullWidth
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
            }}
            classes={{
              scrollPaper: classes.topScrollPaper,
              paperScrollBody: classes.topPaperScrollBody,
            }}
          > 

            <DialogContent>

              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                style={{ marginBottom: 15 }}
                centered
              >
                {cryptoAddrs.map((res, index) => (
                  <Tab label={res.type} key={index} />
                ))}
              </Tabs>

              {cryptoAddrs.map((res, index) => (
                <TabPanel value={tabValue} index={index} key={index}>
                  <div className={classes.qr}>
                    <QRCode
                      style={{
                        borderRadius: 8,
                        margin: 10,
                        boxShadow: "0px 0px 35px 2px rgba(0,0,0,0.2)",
                      }}
                      value={`${res.type}:${res.addr}`}
                      size={200}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"M"}
                      renderAs={"canvas"}
                      includeMargin={true}
                    />
                  </div>
                  <TextField
                    style={{ marginBottom: 15 }}
                    defaultValue={res.addr}
                    label={res.type}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <>
                          <Tooltip title="Copy address" placement="left">
                            <IconButton
                              onClick={() => {
                                navigator.clipboard.writeText(res.addr);
                              }}
                            >
                              <FileCopyIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ),
                    }}
                    variant="outlined"
                    fullWidth
                  />
                </TabPanel>
              ))}
            </DialogContent>
            <DialogActions>
              <Button
                style={{ marginBottom: 1 }}
                href=""
                target="_blank"
              >
               
              </Button>
              <div style={{ flex: "1 0 0" }} />
              <Button onClick={handleClose} color="primary">
              
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </footer>
    
    </div>
  );
}
