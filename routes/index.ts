import {Router} from 'express';
const router = Router();

import {
    createMenuItem,
    getEntries,
    getItemById,
    updateMenuItem,
    deleteMenuItem,
    getAppetizers,
    getMains,
    getDesserts,
    getDrinks,
    addExistingOptionToItem,
    deleteOptionFromItem,
} from '../controllers/menuItems.controller';
import {
    createOption,
    deleteOption,
    getOptionChoices,
    getOptions,
    getOptionsByItemId
} from "../controllers/options.controller";
import {createChoice, deleteChoices} from "../controllers/choices.controller";

router.get('/menuItems', getEntries);
router.get('/menuItems/entry', getAppetizers);
router.get('/menuItems/main', getMains);
router.get('/menuItems/dessert', getDesserts);
router.get('/menuItems/drink', getDrinks);
router.get('/menuItems/:id', getItemById);
router.post('/menuItems', createMenuItem);
router.put('/menuItems/:id', updateMenuItem)
router.delete('/menuItems/:id', deleteMenuItem);
router.delete('/menuItems/options/:itemId/:optionId', deleteOptionFromItem)

router.get('/options/byItem/:id', getOptionsByItemId)
router.get('/options/choices/:id', getOptionChoices)
router.get('/options', getOptions)
router.post('/options', createOption)
router.post('/options/:id', deleteOption)
router.post('/options/item/addition', addExistingOptionToItem)

router.post('/choices', createChoice)
router.delete('/choices/:optionid', deleteChoices)



export default router;