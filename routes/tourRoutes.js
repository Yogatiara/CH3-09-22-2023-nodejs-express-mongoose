const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");

router.param("id", tourController.checkId);

router
  .route("/")
  .get(tourController.getAllToursModel)
  .post(
    // tourController.checkBody,
    tourController.createTourModel
  );

// router.route("/model").post(tourController.cre)

router
  .route("/:id")
  .get(tourController.getTourByIdModel)
  .patch(tourController.editTour)
  .delete(tourController.removeTour);

module.exports = router;
