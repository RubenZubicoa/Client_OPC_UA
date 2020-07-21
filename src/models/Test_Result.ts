import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TestResult extends BaseEntity{

    @PrimaryGeneratedColumn()
    Id?:number;    

    @Column()
    Side:string;

    @Column()
    Serial_Type:string;
    
    @Column()
    Resultado_OK:string;

    @Column()
    Modelo:string;

    @Column()
    Isri_Serial_Number:string;

    @Column()
    Isri_Order:string;

    @Column()
    Hand:string;

    @Column()
    Gan:string;

    @Column()
    Ficticio:string;

    @Column('int')
    Button1_Value:number;

    @Column()
    Button1_State:string;

    @Column('int')
    Button2_Value:number;

    @Column()
    Button2_State:string;

    @Column('int')
    Button3_Value:number;

    @Column()
    Button3_State:string;

    @Column('int')
    Button4_Value:number;

    @Column()
    Button4_State:string;

    @Column('int')
    Button5_Value:number;

    @Column()
    Button5_State:string;

    @Column('int')
    Button6_Value:number;

    @Column()
    Button6_State:string;

    @Column('int')
    Button7_Value:number

    @Column()
    Button7_State:string;

    @Column('int')
    Button8_Value:number;

    @Column()
    Button8_State:string;

    @Column('int')
    Button9_Value:number;

    @Column()
    Button9_State:string;

    @Column('int')
    Button10_Value:number;

    @Column()
    Button10_State:string;

    @Column('int')
    Button11_Value:number;

    @Column()
    Button11_State:string;

    @Column('int')
    Button12_Value:number;

    @Column()
    Button12_State:string;

    @Column('int')
    Button13_Value:number;

    @Column()
    Button13_State:string;

    @Column()
    TiempoCiclo:string;

    @Column("timestamp")
    Date?: Date;
}