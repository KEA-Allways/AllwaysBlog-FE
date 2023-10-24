const userDatabase = require("../Database");
const jwt = require("jsonwebtoken");

const login = (req, res, next) => {
    const {userId, password} = req.body;

    const userInfo = userDatabase.filter(item=>{
        return item.userId === userId;
    })[0]
    
    if(!userInfo){
        res.status(403).json("Not Authorized");
    }else{
        try {
            // access Token 발급
            const accessToken = jwt.sign({
                id : userInfo.id,
                username : userInfo.username,
                userId : userInfo.userId,
            }, process.env.ACCESS_SECRET, {
                expiresIn : "30m",
                issuer : "Sungjun",
            })
            // refresh Token 발급
            const refreshToken = jwt.sign({
                id : userInfo.id,
                username : userInfo.username,
                userId : userInfo.userId,
            }, process.env.REFRESH_SECRET, {
                expiresIn : "24h",
                issuer : "Sungjun",
            })

            // token 전송
            res.cookie("accessToken", accessToken, {
                secure : false,
                httpOnly : true,
            })

            res.cookie("refreshToken", refreshToken, {
                secure : false,
                httpOnly : true,
            })

            res.status(200).json("login Success");


        } catch (error) {
            res.status(500).json(err);
        }
    }


}

const accessToken = (req, res) => {
    try {
        const token = req.cookies.accessToken;
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userData = userDatabase.filter(item => {
            return item.userId === data.userId;
        })[0];

        const {password, ...others} = userData;

        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}

const refreshToken = (req, res) => {
    // 용도 : accesstoken을 갱신하는 용도
    try {
        const token = req.cookies.refreshToken;
        const data = jwt.verify(token, process.env.REFRESH_SECRET);
        const userData = userDatabase.filter(item => {
            return item.userId = data.userId;
        })[0];

        // access Token 새로 발급
        const accessToken = jwt.sign({
            id : userData.id,
            username : userData.username,
            userId : userData.userId,
        }, process.env.ACCESS_SECRET, {
            expiresIn : "30m",
            issuer : "Sungjun",
        });

        res.cookie("accessToken", accessToken, {
            secure : false,
            httpOnly : true,
        })

        res.status(200).json("Access Token Recreated");


    } catch (error) {
        res.status(500).json(error);
    }
}

const loginSuccess = (req, res) => {
    try {
        const token = req.cookies.accessToken;
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userData = userDatabase.filter(item => {
            return item.userId === data.userId;
        })[0];

        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json(error);
    }
}

const logout = (req, res) => {
    try {
        res.cookie("accessToken", "");
        res.cookie("refreshToken", "");
        res.status(200).json("Logout Success");
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    login,
    accessToken,
    refreshToken,
    loginSuccess,
    logout,
}