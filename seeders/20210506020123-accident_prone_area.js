'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const csv = require('csvtojson')

    const filePath = __dirname+'/location.csv';
    console.log(filePath)
    const locations = await csv().fromFile(filePath);
    if(!locations) console.log('no csv file');
    
    else{
      let accident_prone_areas = []
      for(let i = 1;  i<locations.length; i++){
        accident_prone_areas.push(locations[i]);
      }
      await queryInterface.bulkInsert('accident_prone_area', accident_prone_areas);
      
    }
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('accident_prone_area', null, {});
  }
};
