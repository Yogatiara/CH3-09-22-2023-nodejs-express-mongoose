const fs = require("fs");
const tourModel = require("../models/tourModel");

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
);

// const checkId = (req, res, next, val) => {
//   const tour = tours.find(
//     (el) => el.id === val * 1
//   );

//   if (!tour) {
//     return res.status(404).json({
//       status: "failed",
//       message: `data with ${val} this not found`,
//     });
//   }
//   next();
// };

// const checkBody = (req, res, next) => {
//   if (!req.body.name && !req.body.price) {
//     return res.status(404).json({
//       status: "failed",
//       message: "name or price are required",
//     });
//   }
//   next();
// };

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: {
      tours,
    },
  });
};

const getAllToursModel = async (req, res) => {
  try {
    const tours = await tourModel.find();
    res.status(200).json({
      status: "Succes",
      requestTime: req.requestTime,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const getTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const getTourByIdModel = async (req, res) => {
  try {
    const tour = await tourModel.findById(
      req.params.id
    );
    res.status(200).json({
      status: "succes",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const createTour = (req, res) => {
  console.log(req.body.role);
  const newId = tours[tours.length - 1].id + 1;
  const newData = Object.assign(
    { id: newId },
    req.body
  );

  tours.push(newData);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 201 = CREATED
      res.status(201).json({
        status: "success",
        data: {
          tour: newData,
        },
      });
    }
  );
};

const createTourModel = async (req, res) => {
  try {
    const newTour = await tourModel.create(
      req.body
    );
    res.status(201).json({
      status: "Succes",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const editTour = (req, res) => {
  const id = req.params.id * 1;
  // findIndex = -1 (kalau data nya gk ada)
  const tourIndex = tours.findIndex(
    (el) => el.id === id
  );

  // if (tourIndex === -1) {
  //   return res.status(404).json({
  //     status: "failed",
  //     message: `data with ${id} this not found`,
  //   })
  // }

  tours[tourIndex] = {
    ...tours[tourIndex],
    ...req.body,
  };

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `tour with this id ${id} edited`,
        data: {
          tour: tours[tourIndex],
        },
      });
    }
  );
};

const editTourModel = async (req, res) => {
  try {
    const id = req.params.id;
    const updateTour =
      await tourModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );

    res.status(201).json({
      status: "success",
      data: {
        tour: updateTour,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const removeTour = (req, res) => {
  const id = req.params.id * 1;

  const tourIndex = tours.findIndex(
    (el) => el.id === id
  );

  // validasi kalau data yg sesuai req.params.id nya gak ada
  // if (tourIndex === -1) {
  //   return res.status(404).json({
  //     status: "failed",
  //     message: "data not found",
  //   })
  // }

  tours.splice(tourIndex, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "berhasil delete data",
        data: null,
      });
    }
  );
};

const removeTourModel = async (req, res) => {
  try {
    const id = req.params.id;
    await tourModel.findByIdAndRemove(id);
    res.status(201).json({
      status: "success",
      message: "Success to delete data",
      data: {
        data: null,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  removeTour,
  editTour,
  // checkBody,
  createTourModel,
  getAllToursModel,
  getTourByIdModel,
  editTourModel,
  removeTourModel,
  // checkId,
};
