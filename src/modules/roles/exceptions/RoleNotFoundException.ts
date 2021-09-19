import { NotFoundException } from '@nestjs/common';

class RoleNotFoundException extends NotFoundException {
    public constructor(id: number) {
        super(`Tipo de usuário com ID ${id} não encontrado`);
    }
}

export default RoleNotFoundException;
