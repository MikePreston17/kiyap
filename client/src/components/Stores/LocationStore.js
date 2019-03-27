import API from '../../utils/API';
import { decorate, observable, action, computed } from 'mobx';

/**
 * Holds States for School Search components
 */
export default class LocationStore {

    constructor(props) {
        // this.studentId = props && props.studentId;
        this.studentId = '8175652372';
        console.log('current student: ', this.studentId)
        this.locations = [];
        this.schools = [];

        this.loadSavedSchools();
    }

    clear() {
        this.locations = [];
    }


    addSchools (locations) {
        console.log('locations found:', locations)
        this.locations = [...locations];
    }

    removeLocation(id) {
        this.locations = this.locations.filter(l => l.place_id !== id);
    }

    removeSchool(id, studentId) {
        this.schools = this.schools.filter(s=>s._id!==id);
        API.deleteSchool(id)
            .catch(console.error);
    }

    // indicates user's interest in a school.
    // Professionals will be able to indicate their schools and 'put them on the map' for students to find.
    saveSchool(id) {
        let location = this.locations.find(loc=>loc.place_id === id);

        let {name, formatted_address: address, place_id} = location;
        let school = {name, address, studentId: this.studentId};
        this.schools.push(school);

        API.saveSchool(school)
            .catch(console.error);
    }

    //Loads the User saved school data, if any
    loadSavedSchools() {
        console.log('student id: ', this.studentId)
        API.getSchools(this.studentId)
            .then(res => {
                let data = res.data;
                // console.log('saved schools: ', data);
                this.schools = data;
            })
            .catch(console.error);
    }
}

decorate(LocationStore, {
    locations: observable,
    schools: observable,
    clear: action,
    addSchools: action,
})
