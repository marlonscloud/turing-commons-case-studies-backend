const express = require('express')
const router = express.Router()

const { getCaseStudies, getSingleCaseStudy, updateCaseStudy, deleteCaseStudy, createCase, getSingleCaseStudyBySlug } = require('../controllers/caseController')
const { protect, admin } = require('../middleware/authMiddleware')

router.route('/').get(getCaseStudies).post(protect, createCase)
router.route('/:id').get(getSingleCaseStudy).put(protect, updateCaseStudy).delete(protect, deleteCaseStudy)
router.route('/casestudy/:slug').get(getSingleCaseStudyBySlug)

module.exports = {
    routes: router
}