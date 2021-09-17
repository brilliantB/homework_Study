const con = require("../../../modules/mysql");

const BoardController = {

    // 지정된 전체 게시물 불러오기
    // method : GET
    // url : ssac/board
    getAllData: (req, res) => {
        const sql = "select * from board";

        con.query(sql, (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: "전체 게시물 조회 실패",
                });
            }
            res.status(200).json({
                message: "전체 게시물 조회 완료",
                data: result,
            });
        });
    },

    // 게시물 고유 boardIdx가 idx인 게시글을 불러옵니다
    // method : GET
    // url : /ssac/board/:idx
    getIdxData: (req, res) => {
        const { idx } = req.params;
        const sql = "select * from board where boardIdx =?";
        const params = [idx];

        con.query(sql, params, (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: "게시물 조회 실패",
                });
            }
            res.status(200).json({
                message: "게시물 조회 완료",
                data: result,
            });
        });
    },

    // 게시물 저장
    // method : POST
    // url : ssac/board
    // body : {title, content, boardPw, writer(글작성자 idx)}
    // 저장할 정보 : boardIdx, wirter, title, content, writerTime, boardPw
    // 게시물 작성 시간은 입력받는게 아닌 서버 코드에서 넣는 것
    uploadData: (req, res) => {
        const { title, content, boardPw, writer } = req.body;
        const writertime = new Date();
        const sql = "insert into board (title, content, writer, writeTime, boardPw) values(?,?,?,?,?)";
        const params = [title, content, writer, writertime, boardPw];

        con.query(sql, params, (err, result) => {
            if(err)
                return res.status(400).json({
                message: "게시물 저장 실패",
            });
            res.status(200).json({
                message: "게시물 저장 완료",
                data: {
                    title,
                    content,
                    writer,
                    writertime,
                    boardPw,
                },
            });
        });
    },

    // 게시물 삭제
    // method : DELETE
    // url : ssac/board/:idx
    // 게시물 고유 boardIdx가 idx인 게시물을 삭제합니다.
    deleteData: (req, res) => {
        const { idx } = req.params;
        const sql = "delete from board where boardIdx =?";
        const params = [idx];

        con.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({
                    message: "게시물 삭제 실패",
                });
            }
            res.status(200).json({
                message: "게시물 삭제 완료",
            });
        });
    },

};
    

module.exports = BoardController;