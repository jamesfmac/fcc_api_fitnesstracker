const Exercise =require( '../../controllers/exercise.js')

module.exports = app => {
	
	app.route('/api/exercises/')
   .post(Exercise.post)
/*      .get(Exercise.list);
  
  app.route('/api/excercises/:exceriseID')
      .get(Exercise.get);

*/
};