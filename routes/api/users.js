const User =require( '../../controllers/user.js')

module.exports = app => {
	
	app.route('/api/users/')
      .post(User.post)
      .get(User.list);
  
  app.route('/api/users/:userId')
      .get(User.get);
  
  app.route('/api/users/:userId/exercises/')
      .get(User.listExercises)

};