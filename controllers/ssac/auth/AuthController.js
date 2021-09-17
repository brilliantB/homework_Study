const con = require("../../../modules/mysql");

const AuthController = {
    
    // 회원가입
    // method : POST
    // url : /ssac/signup
    // body : { id, name, password }
    // 저장할 정보 : userIdx, id, name, password
    // {message : "중복 아이디 존재"}
    signup: (req, res) => {
		const { id, name, password } = req.body;
		const sql1 = "select id from user where id = ?";
		const sql2 = "insert into user(id,name,password) values(?,?,?)";
		const params1 = [id];
		const params2 = [id, name, password];

		con.query(sql1, params1, (err, result) => {
			if (err) {
				res.status(400).json({
					message: "회원 가입 실패",
				});
			}
			if (result.length === 0) {
				con.query(sql2, params2, (err, result) => {
					if (err) {
						console.log(err);
						return res.status(400).json({
							message: "중복 아이디 존재",
						});
					}
					res.status(200).json({
						message: "회원 가입 완료",
					});
				});
			}
		});
	},
       
    // 로그인
    // method : POST
    // url : ssac/signin
    // boad : { id, password }
    // 비밀번호, id 일치 여부 체크 후 결과값 반환
    signin: (req, res) => {
        const { id, password } = req.body;
		const sql = "select id, password from user where id = ? and password =?";
		const params = [id, password];
        
        con.query(sql, params, (err, result) => {
            if (err){
                return res.status(400).json({
                    message : "로그인 실패",
                });
            }
            if (result.length === 0) {
                return res.status(401).json({
                    message : "정보 불일치",
                });
            } else {
                res.status(200).json({
                    message : "로그인 성공",
                    data: result,
                });
            };
        });
    },

};

module.exports = AuthController;
