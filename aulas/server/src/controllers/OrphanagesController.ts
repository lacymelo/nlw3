import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";
import orphanagesView from "../views/orphanages_view";
import * as Yup from 'yup';

export default class OrphanagesController{
    async index(req: Request, res: Response){
        const orphanagesRepository = getRepository(Orphanage);

        await orphanagesRepository.find({
            relations: ['images']
        })
        .then((response) => {
            return res.status(200).json(orphanagesView.renderMany(response));
        }).catch(() => {
            return res.status(400).json({
                error: "Unexpected error listing orphanages"
            })
        });
    }

    async show(req: Request, res: Response){
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        await orphanagesRepository.findOneOrFail({
            relations: ['images'],
            where: {id}
        })
        .then((response) => {
            return res.status(200).json(orphanagesView.render(response));
        }).catch(() => {
            return res.status(400).json({
                error: "Unexpected error showing orphanage details"
            })
        });
    }

    async create(req: Request, res: Response){
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return {
                path: image.filename
            }
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                }) 
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const orphanage = orphanagesRepository.create(data);

        await orphanagesRepository.save(orphanage)
        .then(() => {
            return res.status(201).json(orphanagesView.render(orphanage));
        }).catch(() => {
            return res.status(400).json({
                error: 'Unexpected error while creating new orphanage'
            })
        });
    }
}