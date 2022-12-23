const { caseStudies } = require('../data');
const Case = require('../models/caseStudies');

const getCaseStudies = async (req, res) => {
    try {
        // return res.json(caseStudies)
        const cases = await Case.find({});
        return res.json(cases);
    } catch (error) {
        return res.send(error)
    }
}

const getSingleCaseStudy = async (req, res) => {
    try {
        const singleCase = await Case.findById(req.params.id)
        return res.json(singleCase)
    } catch (error) {
        return res.send(error)
    }
}

const getSingleCaseStudyBySlug = async (req, res) => {
    try {
        const singleCase = await Case.find({ slug: req.params.slug }).exec()
        return res.json(singleCase)
    } catch (error) {
        return res.send(error)
    }
}

const updateCaseStudy = async (req, res) => {
    const c = await Case.findById(req.params.id)

    if(c) {
        c.heading = req.body.heading || c.heading
        c.subheading = req.body.subheading || c.subheading
        c.slug = req.body.slug || c.slug
        c.overview = req.body.overview || c.overview
        c.keyConsiderations = req.body.keyConsiderations || c.keyConsiderations
        c.prompts = req.body.prompts || c.prompts
        c.people = req.body.people || c.people
        c.datasheet = req.body.datasheet || c.datasheet
        c.featuredImage = req.body.featuredImage || c.featuredImage

        const updatedCase = await c.save()

        res.json(updatedCase);
    } else {
        res.status(404);
        throw new Error("Case Not Found");
    }
}

const deleteCaseStudy = async (req, res) => {
    try {
        const c = await Case.findById(req.params.id)
        if(c) {
            await c.remove()
            res.json({ message: 'Case Study Removed'})
        } else {
            res.status(404);
            throw new Error("Case Study not found");
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const createCase = async (req, res) => {
    const { heading, subheading, slug, overview, keyConsiderations, prompts, people, datasheet, featuredImage } = req.body;

    const newcase = await Case.create({
        heading,
        subheading,
        slug,
        overview,
        keyConsiderations,
        prompts,
        people,
        datasheet,
        featuredImage
    });

    if (newcase) {
        res.status(201).json(newcase);
    } 
    else 
    {
        res.status(400);
        throw new Error("Invalid case data");
    }
}

module.exports = {
    getCaseStudies, 
    getSingleCaseStudy,
    getSingleCaseStudyBySlug,
    updateCaseStudy,
    deleteCaseStudy,
    createCase
}