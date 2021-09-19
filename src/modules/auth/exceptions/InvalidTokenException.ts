import { UnprocessableEntityException } from '@nestjs/common';

class InvalidTokenException extends UnprocessableEntityException {
    public constructor() {
        super(`O token fornecido é inválido`);
    }
}

export default InvalidTokenException;
