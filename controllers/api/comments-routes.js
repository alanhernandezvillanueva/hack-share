const router = require('express').Router();
const { Comment } = require('../../models');


// route retreives all of the comments 
router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentdata => res.json(dbCommentdata))
    .catch(err => {
        res.status(500).json(err);
    });

});
// route creates comments 
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    });

});
//here is the route to delet comments 
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
// export routes 
module.exports = router;
