import { PartialType } from '@nestjs/mapped-types';
import { PhotoDto } from './create-photo.dto';

export class UpdatePhotoDto extends PartialType(PhotoDto) {
    title?: string;
    description?: string;
    isDeleted?: boolean;
}
