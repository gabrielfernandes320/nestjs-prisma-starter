import { UnprocessableEntityException } from '@nestjs/common';

class InvalidEmailException extends UnprocessableEntityException {
    public constructor(email: string) {
        super(`O email ${email} não esta cadastrado`);
    }
}

export default InvalidEmailException;
