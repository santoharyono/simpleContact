import axios from './config';

const url = '/contact';
const GetContacts = () => {
  return axios
    .get(url)
    .then(({data}) => {
      return data;
    })
    .catch((error) => {
      return {
        status: error.response.data.statusCode,
        message: error.response.data.message,
      };
    });
};

const DetailContact = (id) => {
  return axios
    .get(`${url}/${id}`)
    .then(({data}) => {
      return data;
    })
    .catch((error) => {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    });
};

const CreateContact = ({firstName, lastName, age, photo}) => {
  return axios
    .post(url, {firstName, lastName, age, photo})
    .then(({data}) => {
      return data;
    })
    .catch((error) => {
      return {
        status: error.response.data.statusCode,
        message: error.response.data.message,
      };
    });
};

const UpdateContact = ({id, firstName, lastName, age, photo}) => {
  const params = {
    firstName,
    lastName,
    age,
    photo,
  };
  return axios
    .put(`${url}/${id}`, params)
    .then(({data}) => {
      return data;
    })
    .catch((error) => {
      return {
        status: error.response.data.statusCode,
        message: error.response.data.message,
      };
    });
};

const DeleteContact = (id) => {
  return axios
    .delete(`${url}/${id}`)
    .then(({data}) => {
      return data;
    })
    .catch((error) => {
      return {
        status: error.response.data.statusCode,
        message: error.response.data.message,
      };
    });
};

export {
  GetContacts,
  DetailContact,
  CreateContact,
  UpdateContact,
  DeleteContact,
};
