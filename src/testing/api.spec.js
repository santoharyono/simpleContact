import * as API from '../APIs/contactAPI';

describe('Get contacts', () => {
  it('return all saved contacts', async () => {
    const data = await API.GetContacts();
    expect(data.message).toEqual('Get contacts');
    expect(data.data.length).toBeGreaterThanOrEqual(0);
  });
});

describe('Get contact by id', () => {
  it('return contact based param', async () => {
    const contact = await API.DetailContact(
      'b3abd640-c92b-11e8-b02f-cbfa15db428b',
    );
    expect(contact.message).toEqual('Get Contact by id');
    expect(contact.data).toBeDefined();
  });

  it('have wrong parameter will return error message not in contact list', async () => {
    const wrongId = '123';
    const error = await API.DetailContact(wrongId);
    expect(error.message).toEqual(`data id ${wrongId} is not in contact list`);
  });
});

describe('Create contact', () => {
  it('Successfully created contact', async () => {
    const newContact = {
      firstName: 'User',
      lastName: 'Test',
      age: 10,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    };
    const response = await API.CreateContact(newContact);
    expect(response.message).toEqual('contact saved');
  });

  it('whitespace validation', async () => {
    const whitespaceContact = {
      firstName: 'User ',
      lastName: 'Test',
      age: 10,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    };
    const response = await API.CreateContact(whitespaceContact);
    expect(response.message).toMatch(
      /must only contain alpha-numeric characters/,
    );
  });

  it('empty parameter', async () => {
    const emptyParam = {
      firstName: '',
      lastName: '',
      age: 0,
      photo: '',
    };
    const response = await API.CreateContact(emptyParam);
    expect(response.message).toMatch(/is not allowed to be empty/);
  });
});

describe('Update contact', () => {
  it('update successfully', async () => {
    const updatedContact = {
      id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Luke',
      lastName: 'Skywalker',
      age: 90,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    };
    const response = await API.UpdateContact(updatedContact);
    expect(response.message).toEqual('Contact edited');
    expect(response.data).toMatchObject(updatedContact);
  });

  it('Empty parameter', async () => {
    const updatedContact = {
      id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
      firstName: '',
      lastName: 'Skywalker',
      age: 90,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    };
    const response = await API.UpdateContact(updatedContact);
    expect(response.message).toMatch(/is not allowed to be empty/);
  });

  it('Wrong ID', async () => {
    const ID = 'b3abd640-c92b-11e8-b02f-cbfa15db428'; 
    const updatedContact = {
      id: ID,
      firstName: 'Luke',
      lastName: 'Skywalker',
      age: 90,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    };
    const response = await API.UpdateContact(updatedContact);
    expect(response.message).toEqual(`data id ${ID} is not in contact list`);
  });
});

describe('Delete contact', () => {
  it('Wrong deleted ID', async () => {
    const deleteID = '23ead070-b5b9-11ea-8b29-edbb8185346';
    const response = await API.DeleteContact(deleteID);
    expect(response.message).toEqual('contact unavailable');
  });
});
