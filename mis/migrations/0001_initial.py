# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ActualReceipt',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fixed_deposit_saving', models.FloatField()),
                ('regular_saving', models.FloatField()),
                ('insurance_premium_paid', models.FloatField()),
                ('fees', models.FloatField()),
                ('general_principle', models.FloatField()),
                ('general_interest', models.FloatField()),
                ('special_principle', models.FloatField()),
                ('special_interest', models.FloatField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Block',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('block_name', models.CharField(unique=b'True', max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Cluster',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cluster_name', models.CharField(max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('country_name', models.CharField(unique=b'True', max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('district_name', models.CharField(unique=b'True', max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ExpectedReceipt',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('expected_savings', models.FloatField()),
                ('expected_general_principle', models.FloatField()),
                ('expected_general_interest', models.FloatField()),
                ('expected_special_principle', models.FloatField()),
                ('expected_special_loan', models.FloatField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('amount', models.FloatField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='LoanSubType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('subtype_name', models.CharField(max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='LoanType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('type_name', models.CharField(max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('person_name', models.CharField(max_length=100)),
                ('spouse_name', models.CharField(max_length=100)),
                ('job_card_number', models.CharField(max_length=100, blank=True)),
                ('voter_card_number', models.CharField(max_length=100)),
                ('no_of_adults', models.IntegerField()),
                ('no_of_children', models.IntegerField()),
                ('house_hold_per_capita_income', models.IntegerField()),
                ('date_of_entry', models.DateField()),
                ('phone_no', models.CharField(max_length=100, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='SHGBaseLine',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('group_name', models.CharField(max_length=100)),
                ('date_of_formation', models.DateField()),
                ('bank_linkage', models.CharField(max_length=5, choices=[(b'Yes', b'yes'), (b'No', b'no')])),
                ('cc_limit', models.CharField(max_length=100)),
                ('drawing_power', models.CharField(max_length=100)),
                ('savings_account_number', models.CharField(max_length=100)),
                ('loan_account_number', models.CharField(max_length=100)),
                ('savings_account_balance', models.CharField(max_length=100)),
                ('loan_account_balance', models.CharField(max_length=100)),
                ('cluster', models.ForeignKey(to='mis.Cluster')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='SHGProgram',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('loan_from_money_lenders', models.IntegerField()),
                ('loan_from_kcc_or_mfis', models.IntegerField()),
                ('person', models.ForeignKey(to='mis.Person')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('state_name', models.CharField(unique=b'True', max_length=100)),
                ('country', models.ForeignKey(to='mis.Country')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Sublocation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sublocation_name', models.CharField(max_length=100)),
                ('block', models.ForeignKey(to='mis.Block')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Village',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('village_name', models.CharField(max_length=100)),
                ('sublocation', models.ForeignKey(to='mis.Sublocation')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AlterUniqueTogether(
            name='village',
            unique_together=set([('village_name', 'sublocation')]),
        ),
        migrations.AlterUniqueTogether(
            name='sublocation',
            unique_together=set([('sublocation_name', 'block')]),
        ),
        migrations.AlterUniqueTogether(
            name='shgbaseline',
            unique_together=set([('group_name', 'cluster')]),
        ),
        migrations.AddField(
            model_name='person',
            name='village',
            field=models.ForeignKey(to='mis.Village'),
            preserve_default=True,
        ),
        migrations.AlterUniqueTogether(
            name='person',
            unique_together=set([('person_name', 'spouse_name', 'village')]),
        ),
        migrations.AddField(
            model_name='loansubtype',
            name='type',
            field=models.ForeignKey(to='mis.LoanType'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='loan',
            name='subtype',
            field=models.ForeignKey(to='mis.LoanSubType'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='loan',
            name='type',
            field=models.ForeignKey(to='mis.LoanType'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='district',
            name='state',
            field=models.ForeignKey(to='mis.State'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='cluster',
            name='village',
            field=models.ForeignKey(to='mis.Village'),
            preserve_default=True,
        ),
        migrations.AlterUniqueTogether(
            name='cluster',
            unique_together=set([('cluster_name', 'village')]),
        ),
        migrations.AddField(
            model_name='block',
            name='district',
            field=models.ForeignKey(to='mis.District'),
            preserve_default=True,
        ),
    ]
