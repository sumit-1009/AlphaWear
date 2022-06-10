export default function handler(req, res) {

  let pincodes = {
    '442301': ['Hinganghat', 'Maharashtra'],
    '825301': ['Hazaribag', 'Jharkhand'],
    '825303': ['Sakhiya', 'Jharkhand'],
    '411041': ['Pune', 'Maharashtra'],
  }
    res.status(200).json(pincodes)
  }