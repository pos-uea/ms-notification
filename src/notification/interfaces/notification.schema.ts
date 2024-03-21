import * as mongoose from 'mongoose';
import * as moment from 'moment';
moment.locale('pt-br');

export const NotificationSchema = new mongoose.Schema({
    sensor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sensor',
    },
    type: {type: String, required: true},
    value_limite:{ type: Number, required: true},
    value: { type: Number, required: true},
    emails: Array<{type: string }>,
    week: { type: Number, default: moment().isoWeek()},
    month: { type: Number, default: moment().month()+1},
    year: { type: Number, default: moment().year()},

}, { timestamps: true , collection: 'notification'});

