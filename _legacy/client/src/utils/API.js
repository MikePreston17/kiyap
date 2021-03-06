import axios from "axios";

export default {


    /*Schools*/
    getSchools: function () {
        return axios.get("/api/schools");
    },

    /* Get schools a specific student is interested in */
    getStudentSchools: function (studentId) {
        return axios.get("/api/schools/student/" + studentId);
    },

    getSchool: function (id) {
        return axios.get("/api/schools/" + id);
    },

    deleteSchool: function (id) {
        return axios.delete("/api/schools/" + id);
    },

    saveSchool: function (data) {
        return axios.post("/api/schools", data);
    },


    /*Professionals*/
    getPros: function () {
        return axios.get("/api/pros");
    },

    getPro: function (id) {
        return axios.get("/api/pros/" + id);
    },

    deletePro: function (id) {
        return axios.delete("/api/pros/" + id);
    },

    savePro: function (data) {
        return axios.post("/api/pros", data);
    },

    /* Students */

    getStudents: function () {
        return axios.get("/api/students");
    },

    getStudent: function (id) {
        return axios.get("/api/students/" + id);
    },

    deleteStudent: function (id) {
        return axios.delete("/api/students/" + id);
    },

    saveStudent: function (data) {
        return axios.post("/api/students", data);
    },

    /** Misc */

    getDisciplines: function () {
        console.log('get Disciplines()')
        return axios.get("/api/disciplines");
    }

};