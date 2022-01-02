exports.index = (req, res) => {
  res.status(200).json({
    name:'long',
    age:23,
    address : {
      province: 'Luang Prabang'
    }
  });
};