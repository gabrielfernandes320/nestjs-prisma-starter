import { NotFoundException } from '@nestjs/common';

class EntityNotFoundException extends NotFoundException {
    public constructor(id: number) {
        super(`Entidade com ID ${id} não encontrada`);
    }
}

export default EntityNotFoundException;
