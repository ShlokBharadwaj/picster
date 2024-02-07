export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;

    return query;
}

export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image {
            asset-> {
                url
            }
        },
        _id,
        destination,
        postedBy->{
            _id,
            userName,
            image
        },
        save[] {
            _key,
            postedBy->{
                _id,
                userName,
                image
            },
        },
    }`;
    return query;
};

export const feedQuery = `*[_type == 'pin'] | order(_createdAt desc) {
    image {
        asset-> {
            url
        }
    },
    _id,
    destination,
    postedBy->{
        _id,
        userName,
        image
    },
    save[] {
        _key,
        postedBy->{
            _id,
            userName,
            image
        },
    },
}`;

export const userSavedPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
};

export const userCreatedPinsQuery = (userId) => {
    const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
};

export const pinDetailMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
};

export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;
    return query;
};

export const categories = [
    {
        name: 'technology',
        image: 'https://source.unsplash.com/random/?technology',
    },
    {
        name: 'wallpaper',
        image: 'https://source.unsplash.com/random/?wallpaper',
    },
    {
        name: 'sports',
        image: 'https://source.unsplash.com/random/?sports',
    },
    {
        name: 'music',
        image: 'https://source.unsplash.com/random/?music',
    },
    {
        name: 'food',
        image: 'https://source.unsplash.com/random/?food',
    },
    {
        name: 'books',
        image: 'https://source.unsplash.com/random/?books',
    },
    {
        name: 'travel',
        image: 'https://source.unsplash.com/random/?travel',
    },
    {
        name: 'cars',
        image: 'https://source.unsplash.com/random/?cars',
    },
    {
        name: 'quotes',
        image: 'https://source.unsplash.com/random/?quotes',
    },
    {
        name: 'fashion',
        image: 'https://source.unsplash.com/random/?fashion',
    },
    {
        name: 'dogs',
        image: 'https://source.unsplash.com/random/?dogs',
    },
    {
        name: 'others',
        image: 'https://source.unsplash.com/random/',
    },
];