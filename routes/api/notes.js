const router = require('express').Router();
let Note = require('../../models/Note');

router.route('/:user').get((req, res) => {
  Note.findOne(req.params.user)
    // .then(notes => Note.find({user: "Paul"}))
    .then(notes => res.json(notes))
    // .then(console.log(this.params.user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const user = req.body.user;
  const title = req.body.title;
  const content = req.body.content;

  const newNote = new Note({
    user,
    title,	
    content
  });

  newNote.save()
  .then(() => res.json('Note added'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(err => res.status(400).json('Error: ' + err));
});


// router.get('/', (req, res) => {
//   // Note.findOne(req.params.user, {name: "Paul"})
//   //   .then(note => res.json(note))
//   //   .catch(err => res.status(400).json('Errpr: ' + err));
//   const Note = Note.find({user: 'Paul'})
// });


router.route('/:id').delete((req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json('note deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      note.user = req.body.user;
      note.title = req.body.title;
      note.content = req.body.content;

      note.save()
        .then(() => res.json('Note updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;