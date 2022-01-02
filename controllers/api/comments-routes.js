const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentdata => res.json(dbCommentdata))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    });

});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentdata => {
        if(!dbCommentdata) {
            res.status(404).json({message: 'Comment not found'})
            return;
        }
        res.json(dbCommentdata);
     })
     .catch(err => {
         console.log(err);
         res.status(500).json(err);
     })
});

module.exports = router;
