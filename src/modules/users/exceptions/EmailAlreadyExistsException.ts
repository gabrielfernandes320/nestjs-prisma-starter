import { UnprocessableEntityException } from '@nestjs/common';

class EmailAlreadyExistsException extends UnprocessableEntityException {
    public constructor(email: string) {
        super(`O email ${email} já foi cadastrado`);
    }
}

export default EmailAlreadyExistsException;
